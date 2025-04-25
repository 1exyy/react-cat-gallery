import {useState} from "react";
import {Checkbox} from "./components/CheckBox/CheckBox.tsx";
import {Image} from "./components/Image/Image.tsx";
import styles from "./App.module.scss"
import {Button} from "./components/Button/Button.tsx";
import {useCats} from "./hooks/useCats.hook.ts";

function App() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [isAutoGet, setIsAutoGet] = useState(false);
    const {cats, refreshCats, loading} = useCats({
        limit: 1, autoGet: isAutoGet
    })


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Checkbox
                    id="ebebled"
                    label="Enabled"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                />
                <Checkbox
                    id="autoGet"
                    label="Auto-refresh every 5 second"
                    checked={isAutoGet}
                    onChange={() => setIsAutoGet(!isAutoGet)}
                />
                <Button
                    variant="primary"
                    size="large"
                    disabled={!isEnabled || loading}
                    onClick={() => refreshCats()}
                >
                    Get cat
                </Button>
                <Image
                    src={cats[0]?.url}
                    alt="Котик"
                    width={300}
                    height={200}
                    borderRadius={12}
                    objectFit="cover"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

export default App;