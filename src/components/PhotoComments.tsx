import { useState } from 'react';
import { PaperPlaneRight, Trash, Chat } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import type { PhotoComment } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface PhotoCommentsProps {
  photoId: string;
  currentUserId?: string;
  onLoginRequired: () => void;
}

export function PhotoComments({ photoId, currentUserId, onLoginRequired }: PhotoCommentsProps) {
  const [allComments, setAllComments] = useKV<PhotoComment[]>('photo-comments', []);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const comments = (allComments || [])
    .filter(c => c.photoId === photoId)
    .sort((a, b) => a.createdAt - b.createdAt);

  const handleSubmitComment = async () => {
    if (!currentUserId) {
      onLoginRequired();
      return;
    }

    if (!commentText.trim()) {
      toast.error('الرجاء كتابة تعليق');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await window.spark.user();
      
      if (!user) {
        toast.error('فشل جلب معلومات المستخدم');
        return;
      }
      
      const newComment: PhotoComment = {
        id: `comment-${Date.now()}-${Math.random()}`,
        photoId,
        userId: currentUserId,
        userName: user.login,
        userAvatar: user.avatarUrl,
        comment: commentText.trim(),
        createdAt: Date.now(),
      };

      setAllComments(current => [...(current || []), newComment]);
      setCommentText('');
      toast.success('تم إضافة التعليق');
    } catch (error) {
      toast.error('فشل إضافة التعليق');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    setAllComments(current => 
      (current || []).filter(c => c.id !== commentId)
    );
    toast.success('تم حذف التعليق');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Chat size={20} weight="duotone" className="text-muted-foreground" />
        <h3 className="font-semibold text-foreground">
          التعليقات ({comments.length})
        </h3>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Chat size={32} weight="duotone" className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              لا توجد تعليقات بعد. كن أول من يعلق!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={comment.userAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {comment.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">{comment.userName}</p>
                      {currentUserId === comment.userId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        >
                          <Trash size={14} />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                      {comment.comment}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 mr-3">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: ar })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="pt-2 border-t border-border">
        {currentUserId ? (
          <div className="flex gap-2">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              className="resize-none min-h-[80px]"
              disabled={isSubmitting}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmitComment();
                }
              }}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={isSubmitting || !commentText.trim()}
              size="icon"
              className="flex-shrink-0"
            >
              <PaperPlaneRight size={18} weight="fill" />
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              يجب تسجيل الدخول لإضافة تعليق
            </p>
            <Button onClick={onLoginRequired} size="sm">
              تسجيل الدخول
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
