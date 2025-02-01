import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GenderHealth = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Gender-Specific Health Information</CardTitle>
            <CardDescription>
              Comprehensive health information and resources for both women and men
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="women" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="women">Women's Health</TabsTrigger>
                <TabsTrigger value="men">Men's Health</TabsTrigger>
              </TabsList>
              
              <TabsContent value="women" className="space-y-4">
                <div className="prose max-w-none">
                  <h2>Women's Health Topics</h2>
                  
                  <h3>Reproductive Health</h3>
                  <ul>
                    <li>Menstrual health and tracking</li>
                    <li>Birth control options</li>
                    <li>Pregnancy and prenatal care</li>
                    <li>Menopause and hormone changes</li>
                  </ul>

                  <h3>Preventive Care</h3>
                  <ul>
                    <li>Breast cancer screening</li>
                    <li>Cervical cancer screening</li>
                    <li>Bone density testing</li>
                    <li>Heart health</li>
                  </ul>

                  <h3>Common Health Concerns</h3>
                  <ul>
                    <li>Polycystic ovary syndrome (PCOS)</li>
                    <li>Endometriosis</li>
                    <li>Urinary tract infections</li>
                    <li>Osteoporosis</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="men" className="space-y-4">
                <div className="prose max-w-none">
                  <h2>Men's Health Topics</h2>

                  <h3>Reproductive Health</h3>
                  <ul>
                    <li>Prostate health</li>
                    <li>Testosterone levels</li>
                    <li>Fertility</li>
                    <li>Sexual health</li>
                  </ul>

                  <h3>Preventive Care</h3>
                  <ul>
                    <li>Prostate cancer screening</li>
                    <li>Testicular self-examination</li>
                    <li>Heart disease prevention</li>
                    <li>Blood pressure monitoring</li>
                  </ul>

                  <h3>Common Health Concerns</h3>
                  <ul>
                    <li>Erectile dysfunction</li>
                    <li>Male pattern baldness</li>
                    <li>Benign prostatic hyperplasia (BPH)</li>
                    <li>Low testosterone</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GenderHealth;