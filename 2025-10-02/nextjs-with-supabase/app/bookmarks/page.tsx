import { createClient } from '@/lib/supabase/server';
import { CreateBookmarkForm } from './ui/CreateBookmarkForm';
import { BookmarksList } from './ui/BookmarksList';
import { updateBookmark } from './actions';

export const revalidate = 0;

type Bookmark = { id: string; title: string; url: string; created_at?: string };

async function getBookmarks(): Promise<Bookmark[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
    return data ?? [];
}

export default async function BookmarksPage() {
    const bookmarks = await getBookmarks();

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-4">BOOKMARKS</h1>
                <CreateBookmarkForm />
                <BookmarksList bookmarks={bookmarks} />
            </div>

            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Server-side inline edit (demo)</h2>
                {(!bookmarks || bookmarks.length === 0) ? (
                    <p className="text-gray-500">No bookmarks yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {bookmarks.map((b) => (
                            <li key={b.id} className="border rounded-xl p-3">
                                <form action={updateBookmark} className="flex gap-2 items-center w-full">
                                    <input type="hidden" name="id" defaultValue={b.id} />
                                    <input name="title" defaultValue={b.title} className="flex-1 border rounded-xl px-3 py-2" placeholder="Edit title" />
                                    <input name="url" defaultValue={b.url} className="flex-1 border rounded-xl px-3 py-2" placeholder="Edit URL" />
                                    <button type="submit" className="px-3 py-2 rounded-lg border" title="Save (server action)">Save (server)</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
