import { useState, useMemo } from 'react';
import { Heart, Trash, Image as ImageIcon } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { UserRecipePhoto } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface PhotoCardProps {
  photo: UserRecipePhoto;
  currentUserId?: string;
  onLike: () => void;
  onDelete: () => void;
  onClick: () => void;
}

export function PhotoCard({ photo, currentUserId, onLike, onDelete, onClick }: PhotoCardProps) {
  const isLiked = currentUserId ? photo.likedBy.includes(currentUserId) : false;
  const isOwner = currentUserId === photo.userId;

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div 
        className="aspect-square cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img
          src={photo.photoDataUrl}
          alt={photo.caption || 'صورة المستخدم'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={photo.userAvatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {photo.userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{photo.userName}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(photo.createdAt, { addSuffix: true, locale: ar })}
            </p>
          </div>
        </div>

        {photo.caption && (
          <p className="text-sm text-foreground line-clamp-2">
            {photo.caption}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={onLike}
            disabled={!currentUserId}
            className="flex-1"
          >
            <Heart size={16} weight={isLiked ? "fill" : "regular"} />
            <span>{photo.likes}</span>
          </Button>

          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface PhotoGalleryProps {
  recipeId: string;
  currentUserId?: string;
}

export function PhotoGallery({ recipeId, currentUserId }: PhotoGalleryProps) {
  const [allPhotos, setAllPhotos] = useKV<UserRecipePhoto[]>('user-recipe-photos', []);
  const [selectedPhoto, setSelectedPhoto] = useState<UserRecipePhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const photos = useMemo(() => {
    if (!allPhotos) return [];
    const recipePhotos = allPhotos.filter(p => p.recipeId === recipeId);
    return recipePhotos.sort((a, b) => b.createdAt - a.createdAt);
  }, [allPhotos, recipeId]);

  const handleLike = (photo: UserRecipePhoto) => {
    if (!currentUserId) {
      toast.error('يجب تسجيل الدخول للإعجاب بالصور');
      return;
    }

    setAllPhotos(currentPhotos => {
      if (!currentPhotos) return [];
      return currentPhotos.map(p => {
        if (p.id === photo.id) {
          const isLiked = p.likedBy.includes(currentUserId);
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            likedBy: isLiked 
              ? p.likedBy.filter(id => id !== currentUserId)
              : [...p.likedBy, currentUserId]
          };
        }
        return p;
      });
    });
  };

  const handleDelete = (photo: UserRecipePhoto) => {
    if (photo.userId !== currentUserId) {
      toast.error('لا يمكنك حذف صور الآخرين');
      return;
    }

    setAllPhotos(currentPhotos => {
      if (!currentPhotos) return [];
      return currentPhotos.filter(p => p.id !== photo.id);
    });
    toast.success('تم حذف الصورة بنجاح');
    setSelectedPhoto(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">جاري تحميل الصور...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon size={40} weight="duotone" className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">لا توجد صور بعد</h3>
        <p className="text-sm text-muted-foreground">
          كن أول من يشارك صورة لتجربته لهذه الوصفة!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            currentUserId={currentUserId}
            onLike={() => handleLike(photo)}
            onDelete={() => handleDelete(photo)}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl">
          {selectedPhoto && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-right">صورة من {selectedPhoto.userName}</DialogTitle>
              </DialogHeader>
              
              <img
                src={selectedPhoto.photoDataUrl}
                alt={selectedPhoto.caption || 'صورة المستخدم'}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
              />

              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedPhoto.userAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedPhoto.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{selectedPhoto.userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(selectedPhoto.createdAt, { addSuffix: true, locale: ar })}
                  </p>
                </div>
              </div>

              {selectedPhoto.caption && (
                <p className="text-foreground bg-muted p-4 rounded-lg">
                  {selectedPhoto.caption}
                </p>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant={selectedPhoto.likedBy.includes(currentUserId || '') ? "default" : "outline"}
                  onClick={() => handleLike(selectedPhoto)}
                  disabled={!currentUserId}
                  className="flex-1"
                >
                  <Heart size={20} weight={selectedPhoto.likedBy.includes(currentUserId || '') ? "fill" : "regular"} />
                  <span>{selectedPhoto.likes} إعجاب</span>
                </Button>

                {currentUserId === selectedPhoto.userId && (
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedPhoto)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash size={20} />
                    حذف
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
