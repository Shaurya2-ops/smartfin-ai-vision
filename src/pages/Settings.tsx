import { Settings as SettingsIcon, User, Bell, Lock, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="admin-name">Admin Name</Label>
              <Input id="admin-name" defaultValue="John Administrator" />
            </div>
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@smartbank.ai" />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="fraud-alerts">Fraud Alerts</Label>
              <Switch id="fraud-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
              <Switch id="transaction-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts">System Alerts</Label>
              <Switch id="system-alerts" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button className="w-full">Change Password</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-semibold">v2.5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Accounts</span>
              <span className="text-sm font-semibold">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Database Size</span>
              <span className="text-sm font-semibold">1.2 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">ML Model</span>
              <span className="text-sm font-semibold">v3.2 (Active)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
