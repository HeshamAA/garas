import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '../utils/statsMapper';

interface StatisticsGridProps {
  stats: StatCard[];
}

export const StatisticsGrid = ({ stats }: StatisticsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 animate-slide-in-right">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-right">
                {stat.title}
              </CardTitle>
              <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-right">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
