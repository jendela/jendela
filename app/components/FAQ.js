import React from 'react'

const styles = {
    info: {
        background: "#9DBBD0",
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    title: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    entry: {
        paddingBottom: "10px"
    }
}

class FAQ extends React.Component {
    render() {
        return (
            <div>
                <section style={styles.info}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>Tentang Jendela</div>

                            <section>
                                <div className="row">
                                    <div className="large-12 columns">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </div>
                                </div>
                            </section>
                            <br />
                            <section>
                                <div className="row small-up-1 medium-up-2 large-up-4">
                                    <div className="column">
                                        <img src="//placehold.it/150x150" class="thumbnail" alt="" />
                                    </div>
                                    <div className="column">
                                        <img src="//placehold.it/150x150" class="thumbnail" alt="" />
                                    </div>
                                    <div className="column">
                                        <img src="//placehold.it/150x150" class="thumbnail" alt="" />
                                    </div>
                                    <div className="column">
                                        <img src="//placehold.it/150x150" class="thumbnail" alt="" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <section style={styles.content}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>Pertanyaan Umum</div>
                            <section>
                                <h4>Apa yang sedang saya lakukan?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </section>
                            <section>
                                <h4>Apa yang sedang dia lakukan?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </section>
                            <section>
                                <h4>Apa yang sedang kita lakukan?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
    )
    }
    }

    export default FAQ
