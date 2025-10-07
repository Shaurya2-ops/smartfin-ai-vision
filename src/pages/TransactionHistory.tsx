import { useState } from "react";
import { History, Undo2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: string;
  account: string;
  amount: string;
  timestamp: string;
}

export default function TransactionHistory() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TXN005", type: "Deposit", account: "ACC-1234", amount: "$5,000", timestamp: "2025-10-07 10:30 AM" },
    { id: "TXN004", type: "Withdrawal", account: "ACC-5678", amount: "$1,200", timestamp: "2025-10-07 09:15 AM" },
    { id: "TXN003", type: "Transfer", account: "ACC-9012", amount: "$3,500", timestamp: "2025-10-07 08:45 AM" },
    { id: "TXN002", type: "Deposit", account: "ACC-3456", amount: "$8,000", timestamp: "2025-10-06 04:20 PM" },
    { id: "TXN001", type: "Withdrawal", account: "ACC-7890", amount: "$2,300", timestamp: "2025-10-06 02:10 PM" },
  ]);

  const handleUndoLast = () => {
    if (transactions.length === 0) {
      toast({ title: "Info", description: "No transactions to undo", variant: "default" });
      return;
    }
    
    const lastTransaction = transactions[0];
    setTransactions(transactions.slice(1));
    toast({ 
      title: "Transaction Undone", 
      description: `Reversed ${lastTransaction.type} of ${lastTransaction.amount} for ${lastTransaction.account}` 
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-1">View all transactions with undo capability (LIFO - Last In First Out)</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              All Transactions ({transactions.length})
            </CardTitle>
            <Button onClick={handleUndoLast} variant="destructive" className="gap-2">
              <Undo2 className="h-4 w-4" />
              Undo Last Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn, index) => (
                <div 
                  key={txn.id} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    index === 0 
                      ? 'bg-primary/10 border border-primary/30 hover:bg-primary/20' 
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {index === 0 && (
                      <div className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold">
                        LATEST
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{txn.id}</p>
                      <p className="text-sm text-muted-foreground">{txn.account} • {txn.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{txn.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      txn.type === "Deposit" ? "text-success" : "text-destructive"
                    }`}>
                      {txn.type === "Deposit" ? "+" : "-"}{txn.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
