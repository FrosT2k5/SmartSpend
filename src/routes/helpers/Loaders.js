import { getUser } from '../../api/apiutils';

export async function dashboardLoader() {
    const userData  = await getUser();
    return userData;
}