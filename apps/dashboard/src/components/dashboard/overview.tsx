"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@fulfillx/ui";
import {
  ShoppingCart,
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Orders Today",
    value: "127",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Ready to Ship",
    value: "43",
    change: "+5%",
    icon: Package,
    color: "text-orange-600",
  },
  {
    title: "In Transit",
    value: "89",
    change: "+8%",
    icon: Truck,
    color: "text-green-600",
  },
  {
    title: "Revenue Today",
    value: "$12,847",
    change: "+15%",
    icon: DollarSign,
    color: "text-emerald-600",
  },
];

const alerts = [
  {
    type: "Low Stock",
    message: "5 SKUs are running low on inventory",
    severity: "warning",
  },
  {
    type: "Shipping Delay",
    message: "3 orders may be delayed due to carrier issues",
    severity: "error",
  },
  {
    type: "New Integration",
    message: "Shopify store sync completed successfully",
    severity: "success",
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your fulfillment
          operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                {stat.change} from yesterday
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      ORD-{String(i).padStart(6, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      customer{i}@example.com
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${(Math.random() * 200 + 50).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {
                        ["NEW", "READY_TO_SHIP", "DISPATCHED"][
                          Math.floor(Math.random() * 3)
                        ]
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">{alert.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {alert.message}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
