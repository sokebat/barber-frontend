import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

const ReportsTab = () => {
  return (
    <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Reports & Analytics</CardTitle>
        <CardDescription>
          View business performance and metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500">
            Reports feature will be available soon.
          </p>
          <Button className="mt-4">Generate Sample Report</Button>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default ReportsTab