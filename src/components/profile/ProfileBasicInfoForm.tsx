import React, { useState, useEffect } from 'react';
import { Save, User, Phone, Calendar, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserProfile, EditableProfileFields, GENDER_OPTIONS } from '@/types/profile';

interface ProfileBasicInfoFormProps {
  profile: UserProfile;
  onSave: (updates: EditableProfileFields) => Promise<boolean>;
  saving: boolean;
  disabled?: boolean;
  validateField: (field: string, value: string | number | boolean | null | undefined | string[]) => string | null;
}

export function ProfileBasicInfoForm({
  profile,
  onSave,
  saving,
  disabled = false,
  validateField
}: ProfileBasicInfoFormProps) {
  const [formData, setFormData] = useState<EditableProfileFields>({
    fullName: profile.fullName || '',
    phone: profile.phone || '',
    birthDate: profile.birthDate || '',
    gender: profile.gender || '',
    customGender: profile.customGender || '',
    location: profile.location || '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Detectar mudanças no formulário
  useEffect(() => {
    const hasAnyChanges = Object.keys(formData).some(key => {
      const currentValue = formData[key as keyof EditableProfileFields];
      const originalValue = profile[key as keyof UserProfile];
      return currentValue !== (originalValue || '');
    });
    setHasChanges(hasAnyChanges);
  }, [formData, profile]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar campo em tempo real
    const error = validateField(field, value);
    setFieldErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof EditableProfileFields];
      const error = validateField(field, value);
      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Preparar dados para envio (apenas campos modificados)
    const updates: EditableProfileFields = {};
    Object.keys(formData).forEach(key => {
      const currentValue = formData[key as keyof EditableProfileFields];
      const originalValue = profile[key as keyof UserProfile];
      
      if (currentValue !== (originalValue || '')) {
        (updates as Record<string, string | number | boolean | undefined | string[]>)[key] = currentValue;
      }
    });

    if (Object.keys(updates).length === 0) {
      return; // Nenhuma alteração
    }

    const success = await onSave(updates);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: profile.fullName || '',
      phone: profile.phone || '',
      birthDate: profile.birthDate || '',
      gender: profile.gender || '',
      customGender: profile.customGender || '',
      location: profile.location || '',
    });
    setFieldErrors({});
    setHasChanges(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Informações Pessoais
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Nome Completo *
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName || ''}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              disabled={disabled || saving}
              placeholder="Digite seu nome completo"
              className={fieldErrors.fullName ? 'border-red-500' : ''}
              maxLength={100}
            />
            {fieldErrors.fullName && (
              <p className="text-sm text-red-600">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* E-mail (apenas visualização) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">E-mail</Label>
            <Input
              type="email"
              value={profile.email}
              disabled={true}
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">
              O e-mail não pode ser alterado. Entre em contato com o suporte se necessário.
            </p>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              <Phone className="w-4 h-4 inline mr-1" />
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              disabled={disabled || saving}
              placeholder="(11) 99999-9999"
              className={fieldErrors.phone ? 'border-red-500' : ''}
            />
            {fieldErrors.phone && (
              <p className="text-sm text-red-600">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Nascimento
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate || ''}
              onChange={(e) => handleFieldChange('birthDate', e.target.value)}
              disabled={disabled || saving}
              className={fieldErrors.birthDate ? 'border-red-500' : ''}
              max={new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Mínimo 16 anos
            />
            {fieldErrors.birthDate && (
              <p className="text-sm text-red-600">{fieldErrors.birthDate}</p>
            )}
          </div>

          {/* Gênero */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Gênero</Label>
            <Select
              value={formData.gender || ''}
              onValueChange={(value) => handleFieldChange('gender', value)}
              disabled={disabled || saving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu gênero" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Campo customizado para "Outro" */}
            {formData.gender === 'Outro' && (
              <div className="mt-2">
                <Input
                  placeholder="Especifique seu gênero"
                  value={formData.customGender || ''}
                  onChange={(e) => handleFieldChange('customGender', e.target.value)}
                  disabled={disabled || saving}
                  maxLength={50}
                />
              </div>
            )}
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              <MapPin className="w-4 h-4 inline mr-1" />
              Localização
            </Label>
            <Input
              id="location"
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              disabled={disabled || saving}
              placeholder="Cidade, Estado"
              maxLength={100}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={!hasChanges || disabled || saving || Object.keys(fieldErrors).some(key => fieldErrors[key])}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            
            {hasChanges && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={disabled || saving}
                className="flex-1 sm:flex-initial"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
