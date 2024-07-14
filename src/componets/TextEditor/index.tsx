// import { useState, useRef, useMemo } from 'react';
import { Textarea } from '../../components/ui/textarea';

interface TextEditorProps {
  placeholder: string | null,
}

export const TextEditor = ({ placeholder }: TextEditorProps) => {
  return (
    <Textarea placeholder={placeholder ?? "Your article goes here!"} />
  )
};