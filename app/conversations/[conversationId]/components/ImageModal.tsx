"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

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
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event: any) => {
    setImageSize({
      width: event.target.naturalWidth,
      height: event.target.naturalHeight,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex justify-center">
          <Image
            onLoad={handleImageLoad}
            width={imageSize.width}
            height={imageSize.height}
            alt='Image'
            src={src}
            className='object-cover'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
