import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Doctor {
  name: string;
  address: string;
  distance: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

export const DoctorList = ({ doctors }: DoctorListProps) => {
  if (!doctors.length) return null;

  return (
    <div className="space-y-4 mt-6">
      {doctors.map((doctor, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.address}</p>
            <p className="text-sm text-muted-foreground mt-1">{doctor.distance}</p>
          </CardContent>
        </Card>
      ))}
      
      <Alert className="bg-accent/10 border-accent/20 mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-sm text-primary/60">
          This doctor search feature is for informational purposes only. 
          Please verify credentials and availability directly with the healthcare provider.
          In case of emergency, contact emergency services immediately.
        </AlertDescription>
      </Alert>
    </div>
  );
};