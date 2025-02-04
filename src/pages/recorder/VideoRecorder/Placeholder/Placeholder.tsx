import { Button } from '@/components/ui/button';
import { useScreenShare } from '../hooks/use-screen-share';

export const Placeholder = () => {
  const { startScreenshare } = useScreenShare();

  return (
    <div className="bg-gray-400 flex w-full flex-col items-center justify-center gap-4 h-[420px]">
      <span>Start sharing your screen to see it here</span>
      <Button onClick={startScreenshare}>Share screen</Button>
    </div>
  );
};
