export default function ChatBubble({message}) {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
        },
    }
    return (
        <div style={styles.container}>
            <p>{message}</p>
        </div>
    )
}