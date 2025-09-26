import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileImageUploaderProps {
  currentImage?: string;
  userName: string;
  onImageUpload: (file: File) => Promise<boolean>;
  onImageRemove: () => Promise<boolean>;
  uploading: boolean;
  disabled?: boolean;
}

export default function ProfileImageUploader({ 
  currentImage, 
  userName,
  onImageUpload,
  onImageRemove,
  uploading,
  disabled = false
}: ProfileImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    await onImageUpload(file);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleUploadClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await onImageRemove();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Camera className="h-5 w-5" />
          Foto do Perfil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Preview */}
        <div className="flex justify-center">
          <div className="relative">
            {currentImage ? (
              <div className="relative">
                <Image
                  src={currentImage}
                  alt={`Foto de ${userName}`}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={disabled || uploading}
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          {/* Hidden file input - positioned within the upload area only */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            disabled={disabled || uploading}
            className="hidden"
            aria-label="Upload de foto do perfil"
          />
          
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {uploading ? 'Enviando...' : 'Clique ou arraste uma imagem'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG até 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUploadClick}
          disabled={disabled || uploading}
          className="w-full"
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Enviando...' : 'Escolher Arquivo'}
        </Button>
      </CardContent>
    </Card>
  );
}
