import { ShareNetwork, FacebookLogo, TwitterLogo, WhatsappLogo, TelegramLogo, LinkSimple, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import type { Recipe } from '@/lib/types';

interface ShareButtonProps {
  recipe: Recipe;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ShareButton({ recipe, variant = 'outline', size = 'default' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${recipe.name} - بنك الطعام العربي`;
  const shareDescription = `وصفة ${recipe.name} من ${recipe.cuisine} - ${recipe.mealType}. وقت التحضير: ${recipe.totalTime} دقيقة، ${recipe.servings} حصص، ${recipe.nutritionalInfo.calories} سعرة حرارية`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareDescription}\n\n${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setOpen(false);
    toast.success(`تم فتح نافذة المشاركة عبر ${getPlatformName(platform)}`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('تم نسخ الرابط بنجاح');
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error('فشل نسخ الرابط');
    }
  };

  const getPlatformName = (platform: string) => {
    const names = {
      facebook: 'فيسبوك',
      twitter: 'تويتر',
      whatsapp: 'واتساب',
      telegram: 'تيليجرام',
    };
    return names[platform as keyof typeof names];
  };

  if (size === 'icon') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={variant} size={size} className="bg-white/90 hover:bg-white text-foreground border-border">
            <ShareNetwork size={20} weight="duotone" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-foreground">مشاركة الوصفة عبر</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 justify-start hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors"
                  onClick={() => handleShare('facebook')}
                >
                  <FacebookLogo size={20} weight="fill" />
                  فيسبوك
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 justify-start hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-colors"
                  onClick={() => handleShare('twitter')}
                >
                  <TwitterLogo size={20} weight="fill" />
                  تويتر
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 justify-start hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-colors"
                  onClick={() => handleShare('whatsapp')}
                >
                  <WhatsappLogo size={20} weight="fill" />
                  واتساب
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 justify-start hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc] transition-colors"
                  onClick={() => handleShare('telegram')}
                >
                  <TelegramLogo size={20} weight="fill" />
                  تيليجرام
                </Button>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 justify-start"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check size={20} weight="bold" className="text-accent" />
                    تم النسخ!
                  </>
                ) : (
                  <>
                    <LinkSimple size={20} weight="duotone" />
                    نسخ الرابط
                  </>
                )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <ShareNetwork size={20} weight="duotone" />
          مشاركة الوصفة
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">مشاركة الوصفة عبر</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors"
                onClick={() => handleShare('facebook')}
              >
                <FacebookLogo size={20} weight="fill" />
                فيسبوك
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-colors"
                onClick={() => handleShare('twitter')}
              >
                <TwitterLogo size={20} weight="fill" />
                تويتر
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-colors"
                onClick={() => handleShare('whatsapp')}
              >
                <WhatsappLogo size={20} weight="fill" />
                واتساب
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc] transition-colors"
                onClick={() => handleShare('telegram')}
              >
                <TelegramLogo size={20} weight="fill" />
                تيليجرام
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 justify-start"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check size={20} weight="bold" className="text-accent" />
                  تم النسخ!
                </>
              ) : (
                <>
                  <LinkSimple size={20} weight="duotone" />
                  نسخ الرابط
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
