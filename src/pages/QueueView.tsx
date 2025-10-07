import { useState } from "react";
import { Clock, User, Plus, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  service: string;
  waitTime: number;
}

export default function QueueView() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<Customer[]>([
    { id: "1", name: "Alice Johnson", service: "Account Opening", waitTime: 5 },
    { id: "2", name: "Bob Williams", service: "Loan Inquiry", waitTime: 12 },
    { id: "3", name: "Carol Davis", service: "Card Issue", waitTime: 8 },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: "", service: "" });

  const handleAddToQueue = () => {
    if (!newCustomer.name || !newCustomer.service) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      service: newCustomer.service,
      waitTime: 0,
    };
    
    setQueue([...queue, customer]);
    setNewCustomer({ name: "", service: "" });
    toast({ title: "Success", description: `${customer.name} added to queue` });
  };

  const handleServeNext = () => {
    if (queue.length === 0) {
      toast({ title: "Info", description: "Queue is empty", variant: "default" });
      return;
    }
    
    const served = queue[0];
    setQueue(queue.slice(1));
    toast({ title: "Success", description: `Now serving: ${served.name}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Queue Management</h1>
        <p className="text-muted-foreground mt-1">Customer service queue (FIFO - First In First Out)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add to Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                placeholder="John Doe"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="service">Service Required</Label>
              <Input
                id="service"
                placeholder="Account Opening"
                value={newCustomer.service}
                onChange={(e) => setNewCustomer({ ...newCustomer, service: e.target.value })}
              />
            </div>
            <Button onClick={handleAddToQueue} className="w-full">
              Add to Queue
            </Button>
            <Button onClick={handleServeNext} variant="secondary" className="w-full">
              <UserCheck className="h-4 w-4 mr-2" />
              Serve Next Customer
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Current Queue ({queue.length} waiting)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {queue.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Queue is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queue.map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="p-3 rounded-full bg-secondary/10">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{customer.waitTime} min</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
