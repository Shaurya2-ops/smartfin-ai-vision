import { Users, DollarSign, TrendingUp, Shield } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const recentTransactions = [
    { id: "TXN001", account: "ACC-1234", type: "Deposit", amount: "$5,000", status: "Completed" },
    { id: "TXN002", account: "ACC-5678", type: "Withdrawal", amount: "$1,200", status: "Completed" },
    { id: "TXN003", account: "ACC-9012", type: "Transfer", amount: "$3,500", status: "Pending" },
    { id: "TXN004", account: "ACC-3456", type: "Deposit", amount: "$8,000", status: "Completed" },
  ];

  const fraudAlerts = [
    { id: "FRD001", card: "**** 4532", amount: "$2,450", location: "Moscow, Russia", risk: "High" },
    { id: "FRD002", card: "**** 7821", amount: "$890", location: "Lagos, Nigeria", risk: "Medium" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to SmartBank AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value="2,847"
          icon={Users}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard
          title="Total Balance"
          value="$8.4M"
          icon={DollarSign}
          trend="+8% from last month"
          trendUp={true}
        />
        <StatCard
          title="Transactions Today"
          value="342"
          icon={TrendingUp}
          trend="+23% from yesterday"
          trendUp={true}
        />
        <StatCard
          title="Fraud Detected"
          value="12"
          icon={Shield}
          trend="-5% from last week"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all">
                  <div>
                    <p className="font-medium">{txn.id}</p>
                    <p className="text-sm text-muted-foreground">{txn.account} • {txn.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{txn.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      txn.status === "Completed" ? "bg-success/20 text-success" : "bg-secondary/20 text-secondary"
                    }`}>
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Transactions</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-destructive" />
              Fraud Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fraudAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{alert.id}</p>
                      <p className="text-sm text-muted-foreground">{alert.card} • {alert.amount}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.risk === "High" ? "bg-destructive text-destructive-foreground" : "bg-amber-500/20 text-amber-700"
                    }`}>
                      {alert.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Alerts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
