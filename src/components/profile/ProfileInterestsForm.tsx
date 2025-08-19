import React, { useState, useEffect } from 'react';
import { Save, Target, Lightbulb, X, Plus } from 'lucide-react';
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
import { UserProfile, EditableProfileFields, WORK_PREFERENCE_OPTIONS, WORK_ENVIRONMENT_OPTIONS } from '@/types/profile';

interface ProfileInterestsFormProps {
  profile: UserProfile;
  onSave: (updates: EditableProfileFields) => Promise<boolean>;
  saving: boolean;
  disabled?: boolean;
}

// Opções pré-definidas
const COMMON_INTERESTS = [
  'Tecnologia', 'Saúde', 'Negócios', 'Educação', 'Marketing',
  'Design', 'Engenharia', 'Finanças', 'Direito', 'Arte',
  'Comunicação', 'Recursos Humanos', 'Vendas', 'Operações',
  'Sustentabilidade', 'Inovação', 'Empreendedorismo'
];

const COMMON_SKILLS = [
  'Comunicação', 'Liderança', 'Trabalho em equipe', 'Resolução de problemas',
  'Criatividade', 'Análise de dados', 'Gestão de projetos', 'Negociação',
  'Apresentação', 'Excel', 'PowerPoint', 'Inglês', 'Espanhol',
  'Python', 'JavaScript', 'SQL', 'Photoshop', 'Figma'
];

export function ProfileInterestsForm({
  profile,
  onSave,
  saving,
  disabled = false
}: ProfileInterestsFormProps) {
  const [formData, setFormData] = useState<EditableProfileFields>({
    userInterests: [...(profile.userInterests || [])],
    workPreference: profile.workPreference || '',
    workEnvironment: profile.workEnvironment || '',
    companyType: profile.companyType || '',
    userSkills: [...(profile.userSkills || [])],
  });

  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Detectar mudanças no formulário
  useEffect(() => {
    const hasAnyChanges = (
      JSON.stringify(formData.userInterests) !== JSON.stringify(profile.userInterests || []) ||
      formData.workPreference !== (profile.workPreference || '') ||
      formData.workEnvironment !== (profile.workEnvironment || '') ||
      formData.companyType !== (profile.companyType || '') ||
      JSON.stringify(formData.userSkills) !== JSON.stringify(profile.userSkills || [])
    );
    setHasChanges(hasAnyChanges);
  }, [formData, profile]);

  const handleFieldChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !formData.userInterests?.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        userInterests: [...(prev.userInterests || []), trimmed]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      userInterests: prev.userInterests?.filter(i => i !== interest) || []
    }));
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.userSkills?.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        userSkills: [...(prev.userSkills || []), trimmed]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      userSkills: prev.userSkills?.filter(s => s !== skill) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar dados para envio (apenas campos modificados)
    const updates: EditableProfileFields = {};
    
    if (JSON.stringify(formData.userInterests) !== JSON.stringify(profile.userInterests || [])) {
      updates.userInterests = formData.userInterests;
    }
    if (formData.workPreference !== (profile.workPreference || '')) {
      updates.workPreference = formData.workPreference;
    }
    if (formData.workEnvironment !== (profile.workEnvironment || '')) {
      updates.workEnvironment = formData.workEnvironment;
    }
    if (formData.companyType !== (profile.companyType || '')) {
      updates.companyType = formData.companyType;
    }
    if (JSON.stringify(formData.userSkills) !== JSON.stringify(profile.userSkills || [])) {
      updates.userSkills = formData.userSkills;
    }

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
      userInterests: [...(profile.userInterests || [])],
      workPreference: profile.workPreference || '',
      workEnvironment: profile.workEnvironment || '',
      companyType: profile.companyType || '',
      userSkills: [...(profile.userSkills || [])],
    });
    setNewInterest('');
    setNewSkill('');
    setHasChanges(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Interesses e Habilidades
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Áreas de Interesse */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Áreas de Interesse *
            </Label>
            
            {/* Tags de interesses */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
              {formData.userInterests?.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    disabled={disabled || saving}
                    className="text-purple-500 hover:text-purple-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              {formData.userInterests?.length === 0 && (
                <span className="text-gray-500 text-sm">Nenhum interesse selecionado</span>
              )}
            </div>
            
            {/* Campo para adicionar interesse */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite um interesse"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                disabled={disabled || saving}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest(newInterest);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addInterest(newInterest)}
                disabled={!newInterest.trim() || disabled || saving}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Sugestões de interesses */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Sugestões:</Label>
              <div className="flex flex-wrap gap-1">
                {COMMON_INTERESTS.filter(i => !formData.userInterests?.includes(i)).map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => addInterest(interest)}
                    disabled={disabled || saving}
                    className="px-2 py-1 text-xs bg-gray-200 hover:bg-purple-100 hover:text-purple-700 rounded-full transition-colors"
                  >
                    + {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferência de Trabalho */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Preferência de Trabalho</Label>
            <Select
              value={formData.workPreference || ''}
              onValueChange={(value) => handleFieldChange('workPreference', value)}
              disabled={disabled || saving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Como prefere trabalhar?" />
              </SelectTrigger>
              <SelectContent>
                {WORK_PREFERENCE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ambiente de Trabalho */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ambiente de Trabalho</Label>
            <Select
              value={formData.workEnvironment || ''}
              onValueChange={(value) => handleFieldChange('workEnvironment', value)}
              disabled={disabled || saving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Que tipo de empresa te interessa?" />
              </SelectTrigger>
              <SelectContent>
                {WORK_ENVIRONMENT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Empresa */}
          <div className="space-y-2">
            <Label htmlFor="companyType" className="text-sm font-medium">Tipo de Empresa (Específico)</Label>
            <Input
              id="companyType"
              type="text"
              value={formData.companyType || ''}
              onChange={(e) => handleFieldChange('companyType', e.target.value)}
              disabled={disabled || saving}
              placeholder="Ex: Fintech, E-commerce, Consultoria..."
              maxLength={100}
            />
          </div>

          {/* Habilidades */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              <Lightbulb className="w-4 h-4 inline mr-1" />
              Habilidades *
            </Label>
            
            {/* Tags de habilidades */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
              {formData.userSkills?.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    disabled={disabled || saving}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              {formData.userSkills?.length === 0 && (
                <span className="text-gray-500 text-sm">Nenhuma habilidade selecionada</span>
              )}
            </div>
            
            {/* Campo para adicionar habilidade */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite uma habilidade"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                disabled={disabled || saving}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(newSkill);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addSkill(newSkill)}
                disabled={!newSkill.trim() || disabled || saving}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Sugestões de habilidades */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Sugestões:</Label>
              <div className="flex flex-wrap gap-1">
                {COMMON_SKILLS.filter(s => !formData.userSkills?.includes(s)).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    disabled={disabled || saving}
                    className="px-2 py-1 text-xs bg-gray-200 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={!hasChanges || disabled || saving}
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
