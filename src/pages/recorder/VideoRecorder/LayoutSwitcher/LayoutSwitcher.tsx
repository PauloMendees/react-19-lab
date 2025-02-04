import { Camera, Monitor, MonitorSmartphone } from 'lucide-react';
import { useRecordContext } from '../contexts/RecorderContext';
import { ButtonHTMLAttributes, FC } from 'react';

const LayoutButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }> = ({
  children,
  active,
  className,
  ...props
}) => {
  return (
    <button
      className={`flex flex-col items-center p-2 cursor-pointer gap-1 min-w-[200px]  ${active ? 'bg-gray-800' : 'bg-gray-500'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LayoutSwitcher = () => {
  const { layout, setLayout } = useRecordContext();

  return (
    <div className="flex items-center rounded-md text-white text-sm">
      <LayoutButton
        active={layout === 'screen'}
        disabled={layout === 'screen'}
        type="button"
        onClick={() => setLayout('screen')}
        className="rounded-l-md"
      >
        <Monitor />
        <span>Screen</span>
      </LayoutButton>
      <LayoutButton
        active={layout === 'camera'}
        disabled={layout === 'camera'}
        type="button"
        onClick={() => setLayout('camera')}
      >
        <Camera />
        <span>Camera</span>
      </LayoutButton>
      <LayoutButton
        active={layout === 'screen-and-camera'}
        disabled={layout === 'screen-and-camera'}
        type="button"
        onClick={() => setLayout('screen-and-camera')}
        className="rounded-r-md"
      >
        <MonitorSmartphone />
        <span>Screen and Camera</span>
      </LayoutButton>
    </div>
  );
};
