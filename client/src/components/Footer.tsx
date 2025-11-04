import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">ATM Crackers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium quality fireworks and crackers for your celebrations. Certified safe products with nationwide delivery.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/products">
                <a className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-shop">
                  Shop
                </a>
              </Link>
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-about">
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-contact">
                  Contact
                </a>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Shipping Info
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Returns Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Safety Guidelines
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and updates
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">100% Certified</p>
                <p className="text-xs text-muted-foreground">Safety Guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On Orders Over ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Premium Quality</p>
                <p className="text-xs text-muted-foreground">Trusted Brand</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ATM Crackers. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
