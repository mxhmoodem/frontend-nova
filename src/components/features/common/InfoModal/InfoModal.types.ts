export interface InfoModalContent {
  whatFor: string;
  whatItDoes: string[];
  whenToUse: string;
  howToUse: string[];
  example: string;
  projectRelation: string;
}

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: InfoModalContent;
}
