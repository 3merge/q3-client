import { useAuth } from 'q3-ui-permissions';

const useDomainAuth = () => {
  const { canCreate: canModifyDomain } = useAuth('domain');
  const { canSee: canSeeEmailModule } = useAuth('emails');
  const { canSee: canSeeQueueModule } = useAuth('queues');

  return (
    canModifyDomain ||
    canSeeEmailModule ||
    canSeeQueueModule
  );
};

export default useDomainAuth;
