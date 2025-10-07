import { Shield, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function FraudDetection() {
  const { toast } = useToast();

  const transactions = [
    { 
      id: "CC-1001", 
      card: "**** 4532", 
      amount: 2450, 
      merchant: "Electronics Store", 
      location: "Moscow, Russia", 
      riskScore: 92, 
      status: "Flagged",
      factors: ["Unusual location", "High amount", "Suspicious merchant"]
    },
    { 
      id: "CC-1002", 
      card: "**** 7821", 
      amount: 890, 
      merchant: "Online Store", 
      location: "Lagos, Nigeria", 
      riskScore: 68, 
      status: "Review",
      factors: ["Foreign transaction", "New merchant"]
    },
    { 
      id: "CC-1003", 
      card: "**** 2341", 
      amount: 145, 
      merchant: "Grocery Store", 
      location: "New York, USA", 
      riskScore: 12, 
      status: "Safe",
      factors: ["Regular merchant", "Normal amount"]
    },
    { 
      id: "CC-1004", 
      card: "**** 9876", 
      amount: 3200, 
      merchant: "Luxury Hotel", 
      location: "Paris, France", 
      riskScore: 45, 
      status: "Safe",
      factors: ["Known pattern", "Verified location"]
    },
  ];

  const handleFlagFalsePositive = (id: string) => {
    toast({ 
      title: "Feedback Recorded", 
      description: `Transaction ${id} marked as false positive. ML model will learn from this.` 
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive";
    if (score >= 50) return "text-amber-600";
    return "text-success";
  };

  const getRiskBadge = (status: string) => {
    if (status === "Flagged") return <Badge variant="destructive">High Risk</Badge>;
    if (status === "Review") return <Badge className="bg-amber-500">Medium Risk</Badge>;
    return <Badge className="bg-success text-success-foreground">Safe</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Fraud Detection System</h1>
        <p className="text-muted-foreground mt-1">AI-powered credit card fraud detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <h3 className="text-2xl font-bold">28</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Safe</p>
                <h3 className="text-2xl font-bold">1,847</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            ML Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Detection Accuracy</span>
              <span className="text-sm font-bold">94.8%</span>
            </div>
            <Progress value={94.8} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">False Positive Rate</span>
              <span className="text-sm font-bold">3.2%</span>
            </div>
            <Progress value={3.2} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Model Confidence</span>
              <span className="text-sm font-bold">89.5%</span>
            </div>
            <Progress value={89.5} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold">{txn.id}</p>
                      {getRiskBadge(txn.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{txn.card} • {txn.merchant}</p>
                    <p className="text-xs text-muted-foreground mt-1">{txn.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${txn.amount.toLocaleString()}</p>
                    <p className={`text-sm font-semibold ${getRiskColor(txn.riskScore)}`}>
                      Risk: {txn.riskScore}%
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <Progress value={txn.riskScore} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {txn.factors.map((factor, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted">
                      {factor}
                    </span>
                  ))}
                </div>

                {txn.status === "Flagged" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFlagFalsePositive(txn.id)}
                    className="w-full"
                  >
                    Mark as False Positive
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
