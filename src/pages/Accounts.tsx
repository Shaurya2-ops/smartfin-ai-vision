import { useState } from "react";
import { Plus, Search, Trash2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: string;
}

export default function Accounts() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "John Doe", accountNumber: "ACC-1234", balance: 15420, type: "Savings" },
    { id: "2", name: "Jane Smith", accountNumber: "ACC-5678", balance: 28950, type: "Checking" },
    { id: "3", name: "Bob Johnson", accountNumber: "ACC-9012", balance: 7800, type: "Savings" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAccount, setNewAccount] = useState({ name: "", type: "Savings", initialBalance: "" });

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.initialBalance) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    const account: Account = {
      id: Date.now().toString(),
      name: newAccount.name,
      accountNumber: `ACC-${Math.floor(1000 + Math.random() * 9000)}`,
      balance: parseFloat(newAccount.initialBalance),
      type: newAccount.type,
    };
    
    setAccounts([...accounts, account]);
    setNewAccount({ name: "", type: "Savings", initialBalance: "" });
    toast({ title: "Success", description: "Account created successfully" });
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    toast({ title: "Success", description: "Account deleted successfully" });
  };

  const filteredAccounts = accounts.filter(acc =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Account Management</h1>
        <p className="text-muted-foreground mt-1">Manage customer accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="type">Account Type</Label>
              <select
                id="type"
                className="w-full px-3 py-2 border rounded-md"
                value={newAccount.type}
                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
              >
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <Label htmlFor="balance">Initial Balance</Label>
              <Input
                id="balance"
                type="number"
                placeholder="1000"
                value={newAccount.initialBalance}
                onChange={(e) => setNewAccount({ ...newAccount, initialBalance: e.target.value })}
              />
            </div>
            <Button onClick={handleAddAccount} className="w-full">
              Create Account
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Accounts</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.accountNumber} • {account.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">${account.balance.toLocaleString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAccount(account.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
