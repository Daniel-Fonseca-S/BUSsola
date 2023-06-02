const ACCESS_TOKEN_MAP_BOX =
    "access_token=pk.eyJ1IjoiZnNkYmhmZ3YiLCJhIjoiY2xoajB1NjhiMGRmOTNlbjIwb3FkdDIxNyJ9.dCFwL5_xSCr56-UZUhHrEw";

export const fetchLocalMapBox = (local: string) =>
	fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
	).then(response => response.json()).then(data => data);
