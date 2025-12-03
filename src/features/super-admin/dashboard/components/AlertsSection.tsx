import { AlertCircle } from 'lucide-react';
import { Alert } from '../utils/statsMapper';

interface AlertsSectionProps {
  alerts: Alert[];
}

export const AlertsSection = ({ alerts }: AlertsSectionProps) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 animate-slide-in-right">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            alert.type === 'warning'
              ? 'bg-yellow-500/10 border border-yellow-500/20'
              : 'bg-blue-500/10 border border-blue-500/20'
          }`}
        >
          <AlertCircle
            className={`w-5 h-5 ${
              alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
            }`}
          />
          <p className="text-sm font-medium text-right flex-1">{alert.message}</p>
        </div>
      ))}
    </div>
  );
};
