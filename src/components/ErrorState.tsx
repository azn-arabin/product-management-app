import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorStateProps {
  title?: string;
  message: string;
  statusCode?: number;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Error',
  message,
  statusCode,
  onRetry,
}: ErrorStateProps) {
  const displayTitle = statusCode ? `Error ${statusCode}` : title;
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{displayTitle}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
      </Alert>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
