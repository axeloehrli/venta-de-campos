import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FiltersContext } from "../../pages";

export const removeQueryParam = (router, param) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace(
        { pathname, query: params.toString() },
        undefined,
        { shallow: true }
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
                if (filter.name == "hectareas_min") {
                    let string = `< ${filter.value} ha`
                    return <Chip
                        key={filter.name}
                        label={string}
                        color="primary"
                        onDelete={() => removeQueryParam(router, filter.name)}
                    />
                }
                if (filter.name == "hectareas_max") {
                    let string = `> ${filter.value} ha`
                    return <Chip
                        key={filter.name}
                        label={string}
                        color="primary"
                        onDelete={() => removeQueryParam(router, filter.name)}
                    />
                }
                return <Chip
                    key={filter.name}
                    label={filter.value}
                    color="primary"
                    onDelete={() => removeQueryParam(router, filter.name)}
                />
            })}
        </Box>
    )
}