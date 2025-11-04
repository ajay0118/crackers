import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold mb-4" data-testid="text-page-title">
            About ATM Crackers
          </h1>
          <p className="text-xl text-muted-foreground">
            Bringing joy and light to celebrations since 2010
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ATM Crackers was founded with a simple mission: to provide premium quality
                fireworks and crackers that bring joy, wonder, and celebration to every
                occasion. For over a decade, we've been trusted by thousands of families
                across the country to deliver safe, certified, and spectacular products.
              </p>
              <p>
                Our commitment to quality and safety is unwavering. Every product in our
                catalog undergoes rigorous testing and certification to ensure it meets the
                highest safety standards. We believe that celebrations should be memorable
                for all the right reasons.
              </p>
              <p>
                Today, we're proud to offer an extensive range of fireworks, crackers,
                sparklers, and gift sets, all at unbeatable prices. Our 90% discount is our
                way of making celebrations accessible to everyone.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">100% Certified</h3>
              <p className="text-muted-foreground">
                All our products are certified and tested for safety. We never compromise
                on quality or safety standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                We source only the finest materials and work with trusted manufacturers to
                bring you the best products.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We're committed to providing excellent
                service and support at every step.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Celebration Experts</h3>
              <p className="text-muted-foreground">
                With years of experience, we understand what makes celebrations special and
                memorable.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Commitment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're dedicated to making every celebration brighter, safer, and more
              memorable. Thank you for choosing ATM Crackers as your trusted partner in
              celebration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
