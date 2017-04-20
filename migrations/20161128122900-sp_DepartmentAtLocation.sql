CREATE PROCEDURE `DepartmentsAtLocation`
    (
      IN orig_lat FLOAT(17,14),
        IN orig_lon FLOAT(17,14),
        IN service_id INT,
        IN tolerance INT

    )
    BEGIN
    select a.*, d.name, pe.email from (
      select da.department_id as department_id, min(a.distance) as distance, a.level, a.source
    from
    (SELECT id, truncate(st_distance(
      ST_GeomFromText(concat('POINT(',orig_lon, ' ', orig_lat, ')'), 1),
      ST_GeomFromText(concat('POINT(', address.longitude, ' ', address.latitude, ')'), 1)
    ),2) as distance, 99 as level,
    concat(street, ' ', housenumber) as `name`,
    'geo_match' as `source` FROM address order by distance asc) as a JOIN department_address da ON a.id = da.address_id
    where
    distance < tolerance and da.department_id in (select department_id from department_categories where category_id = service_id)
    group by da.department_id, a.level, a.source
    UNION

    select do.department_id as department_id, a.distance, a.level, a.source from
    (SELECT id, 0 as distance, level,
    '' as `name`,
    'area_match' as `source`
    FROM
      regions
    WHERE
      st_within(st_GeomFromText(concat('POINT(',orig_lon, ' ', orig_lat, ')'), 1),regions.shape)) as a JOIN department_ao do on a.id = do.region_id
    where do.department_id in (select department_id from department_categories where category_id = service_id)
    UNION
    (SELECT
        c.department_id,
        0 as distance,
        0 as level,
        'service_match' as `source`
    FROM categories as c JOIN departments d ON c.department_id = d.id where c.id = service_id)
  ) as a JOIN departments d on a.department_id = d.id JOIN people p on a.department_id = p.department_id JOIN peopleEmails pe on p.id = pe.person_id
  order by level desc, distance;
END
