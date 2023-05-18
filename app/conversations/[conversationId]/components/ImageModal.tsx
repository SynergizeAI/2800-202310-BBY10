'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

/**
 * ImageModal component renders a modal dialog displaying an image.
 * @param {ImageModalProps} props - The props object containing isOpen, onClose, and src.
 * @returns {JSX.Element | null} The ImageModal component or null if src is not provided.
 */
const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  src
}) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image 
          className="object-cover" 
          fill 
          alt="Image" 
          src={src}
        />
      </div>
    </Modal>
  )
}

export default ImageModal;