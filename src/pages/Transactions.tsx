import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Transactions() {
  const { toast } = useToast();
  const [depositData, setDepositData] = useState({ account: "", amount: "" });
  const [withdrawData, setWithdrawData] = useState({ account: "", amount: "" });
  const [transferData, setTransferData] = useState({ from: "", to: "", amount: "" });

  const handleDeposit = () => {
    if (!depositData.account || !depositData.amount) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: `Deposited $${depositData.amount} to ${depositData.account}` });
    setDepositData({ account: "", amount: "" });
  };

  const handleWithdraw = () => {
    if (!withdrawData.account || !withdrawData.amount) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: `Withdrew $${withdrawData.amount} from ${withdrawData.account}` });
    setWithdrawData({ account: "", amount: "" });
  };

  const handleTransfer = () => {
    if (!transferData.from || !transferData.to || !transferData.amount) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: `Transferred $${transferData.amount} from ${transferData.from} to ${transferData.to}` });
    setTransferData({ from: "", to: "", amount: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Transactions</h1>
        <p className="text-muted-foreground mt-1">Process deposits, withdrawals, and transfers</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Transaction Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="deposit" className="gap-2">
                <ArrowDownCircle className="h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="gap-2">
                <ArrowUpCircle className="h-4 w-4" />
                Withdraw
              </TabsTrigger>
              <TabsTrigger value="transfer" className="gap-2">
                <ArrowRightCircle className="h-4 w-4" />
                Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="deposit-account">Account Number</Label>
                <Input
                  id="deposit-account"
                  placeholder="ACC-1234"
                  value={depositData.account}
                  onChange={(e) => setDepositData({ ...depositData, account: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="deposit-amount">Amount</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="1000"
                  value={depositData.amount}
                  onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                />
              </div>
              <Button onClick={handleDeposit} className="w-full">
                Process Deposit
              </Button>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="withdraw-account">Account Number</Label>
                <Input
                  id="withdraw-account"
                  placeholder="ACC-1234"
                  value={withdrawData.account}
                  onChange={(e) => setWithdrawData({ ...withdrawData, account: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="withdraw-amount">Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="500"
                  value={withdrawData.amount}
                  onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                />
              </div>
              <Button onClick={handleWithdraw} className="w-full">
                Process Withdrawal
              </Button>
            </TabsContent>

            <TabsContent value="transfer" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="transfer-from">From Account</Label>
                <Input
                  id="transfer-from"
                  placeholder="ACC-1234"
                  value={transferData.from}
                  onChange={(e) => setTransferData({ ...transferData, from: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="transfer-to">To Account</Label>
                <Input
                  id="transfer-to"
                  placeholder="ACC-5678"
                  value={transferData.to}
                  onChange={(e) => setTransferData({ ...transferData, to: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="transfer-amount">Amount</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  placeholder="1500"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                />
              </div>
              <Button onClick={handleTransfer} className="w-full">
                Process Transfer
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
