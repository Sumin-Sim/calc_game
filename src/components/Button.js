export default function Button({children, clickEvent}) {
    return (
        <button type="button" onClick={clickEvent}>{children}</button>
    );
}