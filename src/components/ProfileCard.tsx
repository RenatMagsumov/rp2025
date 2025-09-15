import "./ProfileCard.css";

export default function ProfileCard() {
    return (
        <section className="profile-wrap">
            <div className="profile-card">
                <h1>Renat Magsumov</h1>

                <h3>My hobbies</h3>
                <ul>
                    <li>Sports</li>
                    <li>Eating delicious food</li>
                    <li>Sleeping</li>
                </ul>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Email
                        <input type="email" placeholder="you@example.com" required />
                    </label>

                    <label>
                        Message
                        <textarea placeholder="Write a message..." rows={4} />
                    </label>

                    <button type="button" className="cta">Contact Me</button>
                </form>
            </div>
        </section>
    );
}
