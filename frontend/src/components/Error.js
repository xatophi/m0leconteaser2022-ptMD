function Error({ errorMsg }) {
    if (!errorMsg) {
        return <></>
    }

    return <>
        <br />
        Error: {errorMsg}
        <br />
    </>
}

export { Error }