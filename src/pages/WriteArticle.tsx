
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ChevronDown, Tags, Image as ImageIcon, Trash2, Eye, Save, FileText } from 'lucide-react';

const WriteArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('请输入文章标题');
      return;
    }
    
    if (!content.trim()) {
      toast.error('请输入文章内容');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('文章发布成功！');
      // In a real app, you would redirect to the new article
      // navigate(`/blog/${newArticleId}`);
    } catch (error) {
      toast.error('发布失败，请重试');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">写文章</h1>
          <p className="text-muted-foreground">分享你的技术见解和经验</p>
        </div>
        
        <div className="space-y-6">
          {/* Title input */}
          <div>
            <Label htmlFor="title" className="text-base">文章标题</Label>
            <Input
              id="title"
              placeholder="输入一个吸引人的标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg py-6 mt-2"
            />
          </div>
          
          {/* Cover Image */}
          <div>
            <Label className="text-base mb-2 block">封面图片</Label>
            {coverImage ? (
              <div className="relative mt-2 rounded-lg overflow-hidden">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-64 object-cover"
                />
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="absolute top-3 right-3"
                  onClick={() => setCoverImage(null)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  移除
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mt-2">
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-3">拖放图片到此处，或点击上传</p>
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  选择图片
                </Button>
              </div>
            )}
          </div>
          
          {/* Tags */}
          <div>
            <Label className="text-base mb-2 block">标签</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <div 
                  key={tag}
                  className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button 
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
              {tags.length === 0 && (
                <span className="text-muted-foreground text-sm">添加一些标签以便读者发现你的文章</span>
              )}
            </div>
            <div className="flex items-center">
              <Tags className="w-4 h-4 text-muted-foreground mr-2" />
              <Input
                placeholder="输入标签，按回车添加..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="text-sm"
              />
            </div>
          </div>
          
          {/* Content Editor */}
          <div>
            <Label className="text-base mb-2 block">文章内容</Label>
            <Tabs defaultValue="write" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="write" className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  编辑
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  预览
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="mt-0">
                <Textarea
                  placeholder="使用 Markdown 语法开始写作..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] font-mono resize-y p-4"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  支持 Markdown 语法。可以使用 # 创建标题，* 创建列表，``` 插入代码块等。
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0">
                {content ? (
                  <div className="prose-content border rounded-md p-6 min-h-[400px]">
                    {/* In a real app, this would render the Markdown as HTML */}
                    <div className="prose">
                      {content.split('\n').map((line, i) => (
                        <p key={i}>{line || <br />}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-6 text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
                    <p>还没有内容可预览</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline">
              保存草稿
            </Button>
            
            <div className="flex space-x-3">
              <div className="relative">
                <Button variant="outline" className="flex items-center">
                  发布设置
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    发布中...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 w-4 h-4" />
                    发布文章
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WriteArticle;
