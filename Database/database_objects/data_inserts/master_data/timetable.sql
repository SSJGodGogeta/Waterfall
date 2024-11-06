--liquibase formatted sql
--changeset arman:ar1 runOnChange:false
INSERT INTO timetable (
                       date, weekday, start, end, pause_minutes, performed_hours, difference_performed_target, abscence, staff_id
) VALUES (
             '2024-11-01',                     -- Example date
             DAYNAME('2024-11-01'),            -- Automatically calculates the weekday
             '2024-11-01 09:00:00',            -- Start time
             '2024-11-01 17:00:00',            -- End time
             0,                               -- Pause in minutes
             0,                              -- Performed hours (8 hours minus 1-hour break)
             -8,                             -- Difference performed vs. target (assumes target is 8)
             'SICK',                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         ),
         (
             '2024-11-02',                     -- Example date
             DAYNAME('2024-11-02'),            -- Automatically calculates the weekday
             '2024-11-02 09:00:00',            -- Start time
             '2024-11-02 17:00:00',            -- End time
             0,                               -- Pause in minutes
             0,                              -- Performed hours (8 hours minus 1-hour break)
             -8,                             -- Difference performed vs. target (assumes target is 8)
             'SICK',                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         );

-- changeset arman:ar2 runOnChange:false

INSERT INTO timetable (
    date, weekday, start, end, pause_minutes, performed_hours, difference_performed_target, abscence, staff_id
) VALUES (
             '2024-11-03',                     -- Example date
             DAYNAME('2024-11-03'),            -- Automatically calculates the weekday
             '2024-11-03 09:00:00',            -- Start time
             '2024-11-03 17:00:00',            -- End time
             0,                               -- Pause in minutes
             0,                              -- Performed hours (8 hours minus 1-hour break)
             -8,                             -- Difference performed vs. target (assumes target is 8)
             'VACATION',                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         ),
         (
             '2024-11-04',                     -- Example date
             DAYNAME('2024-11-04'),            -- Automatically calculates the weekday
             '2024-11-04 09:00:00',            -- Start time
             '2024-11-04 17:00:00',            -- End time
             0,                               -- Pause in minutes
             0,                              -- Performed hours (8 hours minus 1-hour break)
             -8,                             -- Difference performed vs. target (assumes target is 8)
             'VACATION',                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         );
INSERT INTO timetable (
    date, weekday, start, end, pause_minutes, performed_hours, difference_performed_target, abscence, staff_id
) VALUES
         (
             '2024-11-05',                     -- Example date
             DAYNAME('2024-11-05'),            -- Automatically calculates the weekday
             '2024-11-05 09:00:00',            -- Start time
             '2024-11-05 17:00:00',            -- End time
             15,                               -- Pause in minutes
             8,                              -- Performed hours (8 hours minus 1-hour break)
             0,                             -- Difference performed vs. target (assumes target is 8)
             NULL,                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         ),
         (
             '2024-11-06',                     -- Example date
             DAYNAME('2024-11-06'),            -- Automatically calculates the weekday
             '2024-11-06 09:00:00',            -- Start time
             '2024-11-06 17:00:00',            -- End time
             15,                               -- Pause in minutes
             8,                              -- Performed hours (8 hours minus 1-hour break)
             0,                             -- Difference performed vs. target (assumes target is 8)
             NULL,                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         );
