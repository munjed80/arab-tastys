import { useState } from 'react';
import { GoogleLogo } from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { initiateGoogleLogin, saveUser } from '@/lib/auth';
import type { User } from '@/lib/types';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: User) => void;
}

export function LoginDialog({ open, onOpenChange, onLoginSuccess }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await initiateGoogleLogin();
      if (user) {
        saveUser(user);
        onLoginSuccess(user);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">مرحباً بك</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            سجل دخولك للوصول إلى جميع الميزات الاجتماعية
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm">ماذا يمكنك فعله بعد تسجيل الدخول:</h3>
            <ul className="text-sm space-y-1 text-muted-foreground mr-4">
              <li>• تقييم الوصفات ومشاركة تجربتك</li>
              <li>• رفع صور أطباقك المطبوخة</li>
              <li>• التفاعل مع المجتمع</li>
              <li>• حفظ وصفاتك المفضلة</li>
            </ul>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            size="lg"
            className="w-full gap-3"
          >
            <GoogleLogo size={24} weight="bold" />
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول بحساب Google'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            بتسجيل الدخول، أنت توافق على سياسة الخصوصية وشروط الاستخدام
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
