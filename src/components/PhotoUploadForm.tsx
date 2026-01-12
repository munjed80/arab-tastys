import { useState, useRef, ChangeEvent } from 'react';
import { Image, Upload, X } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { UserRecipePhoto } from '@/lib/types';

interface PhotoUploadFormProps {
  recipeId: string;
  recipeName: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  onPhotoUploaded: () => void;
}

export function PhotoUploadForm({
  recipeId,
  recipeName,
  userId,
  userName,
  userAvatar,
  onPhotoUploaded,
}: PhotoUploadFormProps) {
  const [photos, setPhotos] = useKV<UserRecipePhoto[]>('user-recipe-photos', []);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('يرجى اختيار ملف صورة');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!photoPreview) {
      toast.error('يرجى اختيار صورة أولاً');
      return;
    }

    setIsUploading(true);
    
    const newPhoto: UserRecipePhoto = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      recipeId,
      userId,
      userName,
      userAvatar,
      photoDataUrl: photoPreview,
      caption: caption.trim() || undefined,
      createdAt: Date.now(),
      likes: 0,
      likedBy: [],
    };

    setPhotos(currentPhotos => {
      if (!currentPhotos) return [newPhoto];
      return [...currentPhotos, newPhoto];
    });
    
    toast.success('تم تحميل الصورة بنجاح!');
    setPhotoPreview(null);
    setCaption('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onPhotoUploaded();
    setIsUploading(false);
  };

  const handleRemovePreview = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/30">
        {!photoPreview ? (
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload size={32} weight="duotone" className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">
                  انقر لاختيار صورة
                </p>
                <p className="text-sm text-muted-foreground">
                  صورة تجربتك لـ "{recipeName}"
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  حجم أقصى: 5 ميجابايت
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={handleRemovePreview}
              className="absolute top-2 left-2 p-2 bg-destructive rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X size={20} weight="bold" className="text-destructive-foreground" />
            </button>
          </div>
        )}
      </div>

      {photoPreview && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="photo-caption">وصف الصورة (اختياري)</Label>
            <Textarea
              id="photo-caption"
              placeholder="شاركنا رأيك في الوصفة أو أي ملاحظات..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              maxLength={300}
              className="resize-none mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {caption.length}/300
            </p>
          </div>

          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              'جاري التحميل...'
            ) : (
              <>
                <Image size={20} weight="duotone" />
                نشر الصورة
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
