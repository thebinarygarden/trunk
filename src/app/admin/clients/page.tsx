import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Card } from '@binarygarden/flora/ui';
import { AuthCard } from '@/components/auth/auth_card';
import { CreateClientForm } from '@/app/admin/clients/create_client_form';
import { adminUserIds, auth } from '@/lib/auth';

// Apps that sign users in through Binary Garden (e.g. flora.app) are registered here.
export default async function ClientsPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session || !adminUserIds.includes(session.user.id)) notFound();

  const clients = await auth.api.getOAuthClients({ headers: requestHeaders });

  return (
    <AuthCard title="oauth clients">
      <div className="col" style={{ gap: 'var(--space-6)' }}>
        <div className="col" style={{ gap: 'var(--space-2)' }}>
          {clients?.map((client) => (
            <Card key={client.client_id} variant="sunken" padding="sm">
              <div style={{ font: 'var(--type-small)', wordBreak: 'break-all' }}>
                <div style={{ fontWeight: 'var(--weight-medium)' }}>
                  {client.client_name ?? 'unnamed'}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  {client.client_id}
                </div>
                <div style={{ color: 'var(--text-faint)' }}>
                  {client.redirect_uris.join(', ')}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <CreateClientForm />
      </div>
    </AuthCard>
  );
}
