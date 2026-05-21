// ============================================
// AUTH MODULE — Supabase Google OAuth
// ============================================
let currentUser = null;

async function signInWithGoogle() {
    if (!supabaseClient) {
        showToast('Supabase is not configured yet. Add your keys to js/supabase-config.js', 'warning');
        return;
    }
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
    });
    if (error) showToast('Login failed: ' + error.message, 'error');
}

async function signOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
}

function getCurrentUser() {
    return currentUser;
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userNameEl = document.getElementById('userName');

    if (user) {
        loginBtn?.classList.add('hidden');
        userProfile?.classList.remove('hidden');
        document.getElementById('cookieBanner')?.classList.add('hidden');

        const avatarUrl = user.user_metadata?.avatar_url;
        const displayName =
            user.user_metadata?.full_name?.split(' ')[0] ||
            user.email?.split('@')[0] ||
            'User';

        if (userAvatarImg) {
            userAvatarImg.src = avatarUrl || '';
            userAvatarImg.style.display = avatarUrl ? 'block' : 'none';
        }
        if (userNameEl) userNameEl.textContent = displayName;
    } else {
        loginBtn?.classList.remove('hidden');
        userProfile?.classList.add('hidden');
    }
}

async function getSupabaseUsage() {
    if (!supabaseClient || !currentUser) return null;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabaseClient
        .from('usage_logs')
        .select('count')
        .eq('user_id', currentUser.id)
        .eq('date', today)
        .maybeSingle();

    if (error) return 0;
    return data?.count || 0;
}

async function incrementSupabaseUsage() {
    if (!supabaseClient || !currentUser) return;

    const today = new Date().toISOString().split('T')[0];
    const { data: existing } = await supabaseClient
        .from('usage_logs')
        .select('id, count')
        .eq('user_id', currentUser.id)
        .eq('date', today)
        .maybeSingle();

    if (existing) {
        await supabaseClient
            .from('usage_logs')
            .update({ count: existing.count + 1 })
            .eq('id', existing.id);
    } else {
        await supabaseClient
            .from('usage_logs')
            .insert({ user_id: currentUser.id, date: today, count: 1 });
    }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    loginBtn?.addEventListener('click', signInWithGoogle);

    userProfile?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown?.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        userDropdown?.classList.add('hidden');
    });

    logoutBtn?.addEventListener('click', async () => {
        await signOut();
        userDropdown?.classList.add('hidden');
        showToast('Signed out successfully', 'info');
    });

    if (!supabaseClient) return;

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        currentUser = session?.user || null;
        updateAuthUI(currentUser);
        if (typeof updateUsageDisplay === 'function') updateUsageDisplay();
    });

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        currentUser = session?.user || null;
        updateAuthUI(currentUser);
    });
});
