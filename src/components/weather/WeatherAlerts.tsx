import React from 'react';
import { WeatherAlert } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Weather Alerts</h2>
        
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={`${alert.event}-${index}`}
              className="p-4 rounded-lg bg-red-50 border border-red-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-red-800">{alert.event}</div>
                <div className="text-sm text-red-600">
                  From: {formatDate(alert.start)} {formatTime(alert.start)}
                  <br />
                  To: {formatDate(alert.end)} {formatTime(alert.end)}
                </div>
              </div>
              <div className="text-sm text-red-700">{alert.description}</div>
              {alert.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {alert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 text-sm text-red-600">
                Source: {alert.sender_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 