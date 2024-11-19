import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Code,
  CheckSquare,
  Link,
  Quote,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const ToolbarButton = ({ 
    onClick, 
    isActive = false,
    title,
    children 
  }: { 
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="relative group/tooltip">
      <button
        onClick={onClick}
        className={`p-2 rounded hover:bg-gray-100 ${
          isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
        }`}
      >
        {children}
      </button>
      <span className="absolute hidden group-hover/tooltip:block bg-gray-800 text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {title}
      </span>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-md p-1 mb-2 flex flex-wrap gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic size={18} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive('taskList')}
        title="Task List"
      >
        <CheckSquare size={18} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <Code size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          const url = window.prompt('Enter the URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        isActive={editor.isActive('link')}
        title="Add Link"
      >
        <Link size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Block Quote"
      >
        <Quote size={18} />
      </ToolbarButton>
    </div>
  );
}