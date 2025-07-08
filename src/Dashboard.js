import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, AlertTriangle, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const stats = {
    totalAssets: 250,
    inUse: 150,
    available: 80,
    damaged: 10,
    eWaste: 10,
    totalValue: 120000
  };

  const statCards = [
    { title: 'Total Assets', value: stats.totalAssets, color: 'bg-blue-500' },
    { title: 'In Use', value: stats.inUse, color: 'bg-green-500' },
    { title: 'Available', value: stats.available, color: 'bg-indigo-500' },
    { title: 'Damaged', value: stats.damaged, color: 'bg-yellow-500' },
    { title: 'E-Waste', value: stats.eWaste, color: 'bg-red-500' },
    { title: 'Total Value', value: `$${stats.totalValue.toLocaleString()}`, color: 'bg-purple-500' }
  ];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-60 bg-gray-100 dark:bg-gray-900 p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Asset Manager</h2>

        <Link to="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2" /> Dashboard
          </Button>
        </Link>

        <Link to="/assets/add">
          <Button variant="ghost" className="w-full justify-start">
            <Plus className="mr-2" /> Add Asset
          </Button>
        </Link>

        <Link to="/assets/review">
          <Button variant="ghost" className="w-full justify-start">
            <AlertTriangle className="mr-2" /> Review Assets
          </Button>
        </Link>

        <Link to="/roles">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2" /> Manage Roles
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-gray-50 dark:bg-gray-800">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

          <div className="space-x-3">
            <Link to="/assets">
              <Button variant="secondary">View All Assets</Button>
            </Link>
            <Link to="/assets/add">
              <Button>Add Asset</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, idx) => (
            <Card key={idx} className="p-4 hover:shadow-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{card.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Asset Distribution</h3>
            {[
              { label: 'In Use', value: stats.inUse, color: 'bg-green-500' },
              { label: 'Available', value: stats.available, color: 'bg-indigo-500' },
              { label: 'Damaged', value: stats.damaged, color: 'bg-yellow-500' },
              { label: 'E-Waste', value: stats.eWaste, color: 'bg-red-500' }
            ].map((item, index) => {
              const percentage = stats.totalAssets > 0 ? (item.value / stats.totalAssets) * 100 : 0;
              return (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="text-gray-900 dark:text-white">{item.value} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/assets/add">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2" /> Add New Asset
                </Button>
              </Link>
              <Link to="/assets/review">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2" /> Review Damaged Assets
                </Button>
              </Link>
              <Link to="/assets?status=available">
                <Button variant="outline" className="w-full justify-start">
                  <Home className="mr-2" /> View Available Assets
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default Dashboard; 
