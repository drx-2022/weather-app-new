import React, { useState, useEffect, useRef } from 'react';
import { GeocodingLocation } from '@/lib/types';
import { formatLocationName } from '@/lib/weather';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  suggestions?: GeocodingLocation[];
  onSuggestionClick?: (location: GeocodingLocation) => void;
  onInput?: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  loading,
  suggestions = [],
  onSuggestionClick,
  onInput,
}: SearchInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle input change with debounce for suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    
    if (onInput) {
      onInput(e.target.value);
    }
    
    if (e.target.value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (location: GeocodingLocation) => {
    if (onSuggestionClick) {
      onSuggestionClick(location);
      setShowSuggestions(false);
      
      // Directly submit the form to trigger the search
      if (formRef.current) {
        // Create and dispatch submit event
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        formRef.current.dispatchEvent(submitEvent);
        
        // If the event wasn't prevented, manually call onSubmit
        if (!submitEvent.defaultPrevented && onSubmit) {
          onSubmit(submitEvent as unknown as React.FormEvent);
        }
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter city name (e.g. London,GB)..."
          className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
          required
          autoComplete="off"
          onFocus={() => value.trim() && suggestions.length > 0 && setShowSuggestions(true)}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Search'
          )}
        </button>

        {/* Location suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionRef}
            className="absolute z-[5000] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <ul className="py-1 max-h-60 overflow-auto">
              {suggestions.map((location) => (
                <li
                  key={`${location.lat}-${location.lon}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(location)}
                >
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-500">
                      {location.state ? `${location.state}, ` : ''}{location.country}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
}