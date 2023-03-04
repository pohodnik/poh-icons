import React, {Fragment, Suspense} from 'react';
import registry from '../svg/registry'
import componentsRegistry from '../svg/renderer';



const DemoComponent = () => {
    const [curGroup, setCurGroup] = React.useState(null);
    const [cur, setCur] = React.useState(null);
    const ref = React.useRef();
    const inpRef = React.useRef();
    const formRef = React.useRef();

    React.useEffect(() => {
        if (!ref.current || !inpRef.current || !formRef.current) {
            return;
        }

        const handleChange = (e) => {
            e.preventDefault();
            if (!inpRef.current.value.length) {
                Array.from(ref.current.querySelectorAll('[data-search]')).forEach((i) => i.style.display = '');
                return;
            }
            Array.from(ref.current.querySelectorAll('[data-search]')).forEach((i) => i.style.display = 'none');
            Array.from(ref.current.querySelectorAll(`[data-search*='${inpRef.current.value.toLocaleLowerCase()}']`)).forEach((i) => i.style.display = '')
        }

        formRef.current.addEventListener('submit', handleChange)

        return () => formRef.current.removeEventListener('submit', handleChange);

    }, []);


    const renderDialog = (cur, curGroup) => {
        const Icon = componentsRegistry[`${curGroup}${cur}`];
        return (
            <dialog open={!!cur} style={{ position: 'fixed', top: '10%', padding: 0, borderRadius: 4, boxShadow: '0 0 0 100vw rgba(0,0,0,0.5)' }}>
                <header  style={{padding: 8, display: 'flex', justifyContent: 'space-between' }} >
                    <h4 style={{margin: 0}}>{curGroup}/{cur}</h4>
                    <button onClick={() => setCur(null)}>×</button>
                </header>

                <section  style={{padding: '64px 12px', border: '1px solid #adadad', textAlign: 'center' }} >
                    <span style={{fontSize: 96}}>
                        <Icon />
                    </span>
                    <input
                        value={`import ${cur} from '@pohodnik/icons/svg/${curGroup}/${cur}';`}
                        style={{ minWidth: 600, width: '100%' }}
                        onFocus={e => e.target.select()}
                    />
                </section>
                <footer  style={{padding: 8, display: 'flex', justifyContent: 'end' }} >
                    <button onClick={() => navigator.clipboard.writeText(`import ${cur} from '@pohodnik/icons/svg/${curGroup}/${cur}';`)}>Copy</button>
                </footer>
            </dialog>
        )
    }

    return <section>
        <header style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, padding: 12, background: '#f8f8f8' }}>
            <h1 style={{ margin: 0 }}>Poh-icons library</h1>
            <form ref={formRef}>
                <input type="search" ref={inpRef} placeholder="Search" />
            </form>
        </header>
        {cur && renderDialog(cur, curGroup)}
        <article ref={ref} style={{ padding: 12 }}>
            {Object.entries(registry).map(([group, icons]) => {
                return <Fragment key={group}>
                    <h5 data-search={icons.join('|').toLocaleLowerCase()} style={{ marginBottom: 4 }}>{group}</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {icons.map((icon => {
                            const Icon = componentsRegistry[`${group}${icon}`];
                            return <button
                                data-search={icon.toLocaleLowerCase()}
                                key={icon}
                                style={{
                                    display: 'flex',
                                    margin: 4,
                                    padding: 4,
                                    border: '1px dotted #fafafa',
                                    borderRadius: 3,
                                    fontSize: 24
                                }}
                                title={icon}
                                onClick={() => {
                                    setCur(icon);
                                    setCurGroup(group);
                                }}
                            >
                                <Icon />
                            </button>
                        }))}
                    </div>

                </Fragment>
            })}
        </article>
    </section>;
}

export default DemoComponent;
