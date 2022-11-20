import Box from "@mui/system/Box"
import Chip from "@mui/material/Chip"
import { useRouter } from "next/router";
import { useContext } from "react";
import { FiltersContext } from "../../pages";

export const removeQueryParam = (router, param) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    params.delete("page_id")
    router.replace(
        { pathname, query: params.toString() },
        undefined,
        { shallow: false }
    );
};

export default function ActiveFilters() {
    const router = useRouter()

    const activeFilters = useContext(FiltersContext)

    return (
        <Box
            padding="10px"
            display="flex"
            flexWrap="wrap"
            gap="10px"
        >
            {activeFilters.map((filter) => {
                switch (filter.name) {
                    case "page_id" || "page_size":
                        return
                    case "precio_por_hectarea_min": {
                        let string = `Más de $${filter.value}/ha`
                        return <Chip
                            key={filter.name}
                            label={string}
                            color="primary"
                            onDelete={() => removeQueryParam(router, filter.name)}
                        />
                    }
                    case "precio_por_hectarea_max": {
                        let string = `Menos de $${filter.value}/ha`
                        return <Chip
                            key={filter.name}
                            label={string}
                            color="primary"
                            onDelete={() => removeQueryParam(router, filter.name)}
                        />
                    }
                    case "hectareas_min": {
                        let string = `Más de ${filter.value} ha`
                        return <Chip
                            key={filter.name}
                            label={string}
                            color="primary"
                            onDelete={() => removeQueryParam(router, filter.name)}
                        />
                    }
                    case "hectareas_max": {
                        let string = `Menos de ${filter.value} ha`
                        return <Chip
                            key={filter.name}
                            label={string}
                            color="primary"
                            onDelete={() => removeQueryParam(router, filter.name)}
                        />
                    }
                    default:
                        return <Chip
                            key={filter.name}
                            label={filter.value}
                            color="primary"
                            onDelete={() => removeQueryParam(router, filter.name)}
                        />
                }
            })}
        </Box>
    )
}