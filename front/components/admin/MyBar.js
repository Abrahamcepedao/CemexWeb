// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { Bar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyBar = ({ data, commonProps }) => (
    <Bar
        data={data}
        {...commonProps}
        keys={[
            'value'
        ]}
        indexBy="cluster"
        margin={{ top: 20, right: 60, bottom: 50, left: 30 }}
        padding={0.3}
        width={900}
        height={500}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => String(data[`color`])}
        tooltip={({ id, value, color }) => (
            <div
                style={{
                    padding: 12,
                    color,
                    background: '#222222',
                    borderRadius: 10,
                }}
            >
                <strong>
                    {id}: {value}
                </strong>
            </div>
        )}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        enableGridY={false}
        enableGridX={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)

export default MyBar