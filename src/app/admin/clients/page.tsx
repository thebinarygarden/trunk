import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
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
        <AuthCard title="OAuth clients">
            <div className="flex flex-col gap-6">
                <ul className="flex flex-col gap-3 text-sm">
                    {clients?.map((client) => (
                        <li key={client.client_id} className="flex flex-col">
                            <span className="font-bold">{client.client_name ?? 'Unnamed'}</span>
                            <span className="break-all">{client.client_id}</span>
                            <span className="break-all text-(--on-surface)">{client.redirect_uris.join(', ')}</span>
                        </li>
                    ))}
                </ul>
                <CreateClientForm />
            </div>
        </AuthCard>
    );
}
